# Standalone repository migration

Atlas was extracted from `asaabey/picorules-top-node`, directory `picorules-atlas/`,
using `git subtree split`. The source snapshot was parent commit
`58fa97e` (including the committed landing-page work). Atlas commits retain their
original author, date and message; hashes change because files are now at the root.
The parent repository retains the original complete history.

The standalone application installs compiler `1.1.1` from npm, pinned by version
and package-lock integrity. Its published source commit differs from the former
CORE_COMPILER_SHA only in lockfile version metadata. No adjacent checkout is needed.
CI and Netlify configuration now belong to this repository. The phenotype source
audit referenced by the documentation is included under `research/`.

In the parent workspace, Atlas is an independent ignored checkout, like the other
Picorules applications. Run its `bootstrap.sh` to clone missing repositories.
There is no parent submodule pointer to update when Atlas changes.
