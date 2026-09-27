import unittest
import csv
import json

from benchmark import ROOT, Similarity, ranked, sha256


class SimilarityTests(unittest.TestCase):
    def setUp(self):
        self.model = Similarity(
            {'specific': {'common'}, 'common': {'root'}, 'other': {'root'}},
            {'a': {'specific', 'common'}, 'b': {'common'}, 'c': {'other'}},
        )

    def test_specific_finding_is_more_informative_and_parent_count_is_deduplicated(self):
        self.assertEqual(self.model.counts['common'], 2)
        self.assertGreater(self.model.information('specific'), self.model.information('common'))

    def test_parent_child_redundancy_does_not_change_the_score(self):
        query = self.model.nonredundant(['specific', 'common', 'specific'])
        self.assertEqual(query, ['specific'])
        self.assertEqual(self.model.score(query, 'a'), self.model.score(['specific'], 'a'))

    def test_broad_query_does_not_distinguish_exact_from_more_specific_annotation(self):
        self.assertEqual(self.model.score(['common'], 'a'), self.model.score(['common'], 'b'))

    def test_no_evidence_returns_no_score_or_rank(self):
        self.assertIsNone(self.model.score([], 'a'))
        self.assertEqual(ranked({'a': None, 'b': None}), {'a': None, 'b': None})

    def test_ties_are_preserved(self):
        self.assertEqual(ranked({'a': 3, 'b': 3, 'c': 1}), {'a': 1, 'b': 1, 'c': 3})


class RecordedEngineTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.report = json.loads((ROOT / 'results.json').read_text())
        cls.cases = {c['id']: c for c in cls.report['cases']}

    def test_recorded_run_matches_sources_and_contains_all_targets(self):
        for name, digest in self.report['benchmarkInputHashes'].items():
            self.assertEqual(sha256(ROOT / name), digest)
        targets = {r['diseaseId'] for r in self.report['coverage']}
        self.assertEqual(len(targets), 6)
        for case in self.cases.values():
            if case['id'] == 'no_observations':
                self.assertEqual(case['lirical']['status'], 'not_run_no_evidence')
            else:
                self.assertEqual(case['lirical']['status'], 'completed')
                self.assertEqual(set(case['lirical']['ranks']), targets)

    def test_excluded_finding_reduces_reference_support_relative_to_unknown(self):
        def fabry_score(case_id):
            return next(r['log10LR'] for r in self.cases[case_id]['lirical']['result']
                        if r['diseaseId'] == 'ORPHA:324')
        self.assertLess(fabry_score('fabry_explicit_absence'), fabry_score('fabry_missing_detail'))

    def test_redundant_parent_case_has_identical_engine_contributions(self):
        self.assertEqual(self.cases['alport_pattern']['lirical']['result'],
                         self.cases['alport_redundant_parent']['lirical']['result'])

    def test_weight_matrix_is_complete_and_consistent_with_individual_case(self):
        with (ROOT / 'candidate-weights.csv').open() as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual(len(rows), 204)
        self.assertEqual(len({(r['disease_id'], r['feature_id']) for r in rows}), 204)
        self.assertEqual(sum(r['declared_in_atlas_rule'] == 'True' for r in rows), 35)
        contribution = next(r for r in rows if r['disease_id'] == 'ORPHA:324'
                            and r['feature_id'] == 'acroparesthesia')
        single = next(r for r in self.cases['acroparaesthesia_only']['lirical']['result']
                      if r['diseaseId'] == 'ORPHA:324')
        self.assertAlmostEqual(float(contribution['log10_weight']), single['log10LR'])


if __name__ == '__main__':
    unittest.main()
