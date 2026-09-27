import { expect, test } from '@playwright/test';
import collections from '../src/generated/collections.json';

test('feature-only checklist uses two columns on desktop and one on mobile', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();

  const kidneyCards = page.locator('#kidney .question-card');
  const first = kidneyCards.nth(0);
  const second = kidneyCards.nth(1);
  await page.evaluate(() => document.fonts.ready);
  const desktopBoxes = await kidneyCards.evaluateAll(cards => cards.slice(0, 2).map(card => {
    const box = card.getBoundingClientRect();
    return { x: box.x, y: box.y };
  }));
  expect(desktopBoxes).toHaveLength(2);
  expect(Math.abs(desktopBoxes[0].y - desktopBoxes[1].y)).toBeLessThan(2);
  expect(desktopBoxes[1].x).toBeGreaterThan(desktopBoxes[0].x);

  const featureLabel = await first.locator('h4 label').innerText();
  await expect(first.getByRole('heading', { name: featureLabel })).toBeVisible();
  await expect(page.locator('.question-prompt')).toHaveCount(0);
  await expect(first.locator('.question-code')).toHaveText(/^HP:\d{7}$/);
  const firstCheckbox = first.getByRole('checkbox', { name: `Mark ${featureLabel} as present` });
  await first.locator('h4 label').click();
  await expect(firstCheckbox).toBeChecked();
  await firstCheckbox.focus();
  await page.keyboard.press('Space');
  await expect(firstCheckbox).not.toBeChecked();

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileBoxes = await kidneyCards.evaluateAll(cards => cards.slice(0, 2).map(card => {
    const box = card.getBoundingClientRect();
    return { x: box.x, y: box.y };
  }));
  expect(mobileBoxes[1].y).toBeGreaterThan(mobileBoxes[0].y);
  expect(Math.abs(mobileBoxes[0].x - mobileBoxes[1].x)).toBeLessThan(2);
  const dimensions = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
});

test('disease filter shows exact rule inputs and keeps answers across views', async ({ page }) => {
  const collection = collections.ikd;
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();

  const filters = page.getByRole('group', { name: 'Filter questions by disease' });
  const all = filters.getByRole('button', { name: 'All diseases' });
  await expect(all).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('article.question-card')).toHaveCount(collection.questions.length);

  for (const rule of collection.rules) {
    const button = filters.getByRole('button', { name: rule.label, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    const expected = collection.questions.filter(question =>
      question.diseases.some(disease => disease.ruleId === rule.id)).map(question => question.featureId);
    const visible = await page.locator('article.question-card input[type="checkbox"]')
      .evaluateAll(inputs => inputs.map(input => input.getAttribute('name')?.replace('answer-', '')));
    expect(visible).toEqual(expected);
    await expect(page.getByRole('status')).toContainText(`Showing ${expected.length} of ${collection.questions.length} features`);
    const expectedSections = new Set(collection.questions.filter(question => expected.includes(question.featureId))
      .map(question => question.section));
    await expect(page.locator('.section-nav a')).toHaveCount(expectedSections.size);
  }

  const firstRule = collection.rules[0];
  const secondRule = collection.rules[1];
  await filters.getByRole('button', { name: firstRule.label, exact: true }).click();
  const firstFeature = collection.questions.find(question =>
    question.diseases.some(disease => disease.ruleId === firstRule.id))!;
  const checked = page.locator(`input[name="answer-${firstFeature.featureId}"]`);
  await checked.check();
  await filters.getByRole('button', { name: secondRule.label, exact: true }).click();
  await filters.getByRole('button', { name: firstRule.label, exact: true }).click();
  await expect(checked).toBeChecked();
  await expect(page.getByText(`1 / ${collection.questions.length} present`)).toBeVisible();

  await page.getByRole('button', { name: 'Show results' }).click();
  await expect(page.locator('.result-card')).toHaveCount(collection.rules.length);
  await all.click();
  await expect(page.locator('article.question-card')).toHaveCount(collection.questions.length);
  await expect(checked).toBeChecked();
});

test('mobile disease filter works by keyboard without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  const filter = page.getByRole('group', { name: 'Filter questions by disease' })
    .getByRole('button', { name: 'Fabry disease' });
  await filter.focus();
  await page.keyboard.press('Enter');
  await expect(filter).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('article.question-card')).toHaveCount(6);
  await expect(page.getByRole('status')).toContainText('Fabry disease');
  const dimensions = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
});

test('inheritance patterns are shared, keyboard reachable, and visible without changing scores', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  const patterns = page.locator('#family_history article.question-card');
  await expect(patterns).toHaveCount(3);
  const xLinked = patterns.getByRole('checkbox', { name: /X-linked inheritance/i });
  await xLinked.focus();
  await page.keyboard.press('Space');
  await expect(xLinked).toBeChecked();

  const filters = page.getByRole('group', { name: 'Filter questions by disease' });
  await filters.getByRole('button', { name: 'Fabry disease', exact: true }).click();
  await expect(page.locator('#family_history article.question-card')).toHaveCount(1);
  await filters.getByRole('button', { name: 'Autosomal recessive polycystic kidney disease' }).click();
  await expect(page.locator('#family_history article.question-card')).toHaveCount(1);
  await expect(page.locator('#family_history')).toContainText('autosomal recessive');
  await filters.getByRole('button', { name: 'Alport syndrome' }).click();
  await expect(page.locator('#family_history article.question-card')).toHaveCount(3);
  await expect(xLinked).toBeChecked();

  await page.getByRole('button', { name: 'Show results' }).click();
  const fabryResult = page.locator('#result-ikd_fabry').locator('..');
  await expect(fabryResult).toContainText('Phenotype matching score: 0.000');
  await expect(fabryResult).toContainText('Family history recorded for context (unweighted)');
  await expect(fabryResult).toContainText('X-linked inheritance');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('collection selection, answers, context, reset and leaving', async ({ page }, testInfo) => {
  const answerWrites: string[] = [];
  page.on('request', request => {
    if (request.method() !== 'GET' && request.method() !== 'HEAD') {
      answerWrites.push(`${request.method()} ${request.url()}`);
    }
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Choose an assessment' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open assessment' })).toHaveCount(1);
  await page.screenshot({ path: testInfo.outputPath('selector.png'), fullPage: true });

  await page.getByRole('button', { name: 'Open assessment' }).click();
  await expect(page.getByRole('heading', { name: 'Inherited kidney disease' })).toBeVisible();
  await expect(page.locator('article.question-card')).toHaveCount(42);
  for (const section of ['Kidney', 'Skin and sweating', 'Eyes', 'Neurological history']) {
    await expect(page.getByRole('heading', { name: section, exact: true })).toBeVisible();
  }
  await expect(page.getByText('0 / 42 present')).toBeVisible();
  await expect(page.getByText('Tick documented findings and family-history patterns. Unticked items are treated as absent when you show results.')).toBeVisible();
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath('assessment.png'), fullPage: true });

  const proteinuria = page.locator('article.question-card').filter({
    has: page.getByRole('heading', { name: 'Proteinuria' }),
  });
  const requestsAfterAnswering: string[] = [];
  page.on('request', request => requestsAfterAnswering.push(request.url()));
  const proteinuriaCheckbox = proteinuria.getByRole('checkbox', { name: 'Mark Proteinuria as present' });
  await proteinuriaCheckbox.focus();
  await page.keyboard.press('Space');
  await expect(proteinuriaCheckbox).toBeChecked();
  await expect(page.getByText('1 / 42 present')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(proteinuriaCheckbox).not.toBeChecked();
  await expect(page.getByText('0 / 42 present')).toBeVisible();
  expect(requestsAfterAnswering).toEqual([]);
  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
  }))).toEqual({ local: [], session: [] });

  await proteinuria.locator('summary').filter({ hasText: 'Fabry disease' }).click();
  await expect(proteinuria.getByText('This is background context').first()).toBeVisible();
  await expect(proteinuria.getByRole('link', { name: /GeneReviews/i })).toHaveAttribute('href', /^https:\/\//);
  await page.screenshot({ path: testInfo.outputPath('disease-context.png'), fullPage: true });
  await proteinuria.locator('summary').filter({ hasText: 'Fabry disease' }).focus();
  await page.keyboard.press('Enter');
  await expect(proteinuria.getByText('This is background context').first()).toBeHidden();
  await page.keyboard.press('Enter');
  await expect(proteinuria.getByText('This is background context').first()).toBeVisible();

  await page.getByRole('button', { name: 'Reset answers' }).click();
  await expect(page.getByText('0 / 42 present')).toBeVisible();
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);

  await proteinuriaCheckbox.check();
  await page.getByRole('button', { name: 'All collections' }).click();
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page.getByRole('button', { name: 'Keep assessing' }).click();
  await expect(page.getByRole('heading', { name: 'Inherited kidney disease' })).toBeVisible();
  await page.getByRole('button', { name: 'All collections' }).click();
  await page.getByRole('button', { name: 'Discard answers' }).click();
  await expect(page.getByRole('heading', { name: 'Choose an assessment' })).toBeVisible();
  await page.getByRole('button', { name: 'Open assessment' }).click();
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);
  await proteinuriaCheckbox.check();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Choose an assessment' })).toBeVisible();
  expect(answerWrites).toEqual([]);
});

test('mobile assessment has usable controls without horizontal overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Open assessment' })).toBeVisible();
  await page.getByRole('button', { name: 'Open assessment' }).click();

  const proteinuria = page.locator('article.question-card').filter({
    has: page.getByRole('heading', { name: 'Proteinuria' }),
  });
  await proteinuria.getByRole('checkbox', { name: 'Mark Proteinuria as present' }).check();
  await proteinuria.locator('summary').filter({ hasText: 'Fabry disease' }).click();
  await expect(proteinuria.getByRole('link', { name: /GeneReviews/i })).toBeVisible();
  await expect(page.getByText('1 / 42 present')).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
  }))).toEqual({ local: [], session: [] });
  await page.screenshot({ path: testInfo.outputPath('assessment-mobile.png'), fullPage: true });

  await page.getByRole('button', { name: 'Reset answers' }).click();
  await expect(page.locator('article.question-card input:checked')).toHaveCount(0);
});

test('assessment opens when randomUUID is unavailable on an HTTP LAN origin', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Crypto.prototype, 'randomUUID', { value: undefined, configurable: true });
  });
  await page.goto('/');
  expect(await page.evaluate(() => typeof crypto.randomUUID)).toBe('undefined');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  await expect(page.locator('article.question-card')).toHaveCount(42);
  await expect(page.getByText('This assessment could not be opened. Please try again later.')).toHaveCount(0);
  await page.locator('article.question-card').first().getByRole('checkbox').check();
  await expect(page.getByText('1 / 42 present')).toBeVisible();
});

test('one action shows rule results and FHIR download beside editable questions', async ({ page }) => {
  const writes: string[] = [];
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  const card = (name: string) => page.locator('article.question-card').filter({
    has: page.getByRole('heading', { name, exact: true }),
  });
  await card('Proteinuria').getByRole('checkbox').check();
  await card('Angiokeratomas').getByRole('checkbox').check();
  await expect(page.getByRole('button', { name: 'Show results' })).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Run demonstration' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Show results' }).click();
  await expect(page.getByRole('heading', { name: 'Rule results' })).toBeFocused();
  await expect(page.locator('article.question-card')).toHaveCount(42);
  await expect(card('Reduced sweating').getByRole('checkbox')).not.toBeChecked();
  await expect(card('Seizures').getByRole('checkbox')).not.toBeChecked();
  await expect(page.getByRole('button', { name: 'Show results' })).toHaveCount(0);
  const fabry = page.locator('.result-card').filter({ has: page.getByRole('heading', { name: 'Fabry disease' }) });
  const tsc = page.locator('.result-card').filter({ has: page.getByRole('heading', { name: 'Tuberous sclerosis complex' }) });
  await expect(fabry).toContainText('Phenotype matching score: 4.651');
  await expect(fabry).toContainText('2 / 6 linked findings');
  await expect(fabry).toContainText('Proteinuria, Angiokeratomas');
  await expect(tsc).toContainText('Phenotype matching score: 0.000');
  await expect(tsc).toContainText('0 / 6 linked findings');
  await expect(fabry.getByRole('link', { name: /Read exact authored ruleblock/ }))
    .toHaveAttribute('href', /ikd_fabry-.*\.prb$/);

  await fabry.getByText('View weights and score breakdown').click();
  await expect(fabry).toContainText('Angiokeratomas: Present · weight 3.069 · contribution 3.069');
  await expect(fabry).toContainText('Reduced sweating: Absent · weight 2.123 · contribution 0.000');
  await page.screenshot({ path: 'test-results/weighted-results.png', fullPage: true });

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download FHIR bundle' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^atlas-ikd-.*-assessment\.fhir\.json$/);
  const fs = await import('node:fs/promises');
  const bundle = JSON.parse(await fs.readFile(await download.path(), 'utf8'));
  expect(bundle.resourceType).toBe('Bundle');
  expect(bundle.entry.filter((entry: { resource: { resourceType: string } }) =>
    entry.resource.resourceType === 'Observation')).toHaveLength(50);
  expect(bundle.entry.some((entry: { resource: { identifier?: { value: string }[]; valueBoolean?: boolean } }) =>
    entry.resource.identifier?.[0]?.value === 'proteinuria' && entry.resource.valueBoolean === true)).toBe(true);
  expect(bundle.entry.some((entry: { resource: { identifier?: { value: string }[]; valueBoolean?: boolean } }) =>
    entry.resource.identifier?.[0]?.value === 'seizure' && entry.resource.valueBoolean === false)).toBe(true);
  const scores = bundle.entry.map((entry: { resource: unknown }) => entry.resource)
    .filter((resource: { identifier?: { system: string }[] }) =>
      resource.identifier?.[0]?.system === 'https://atlas.picorules.com/fhir/NamingSystem/rule-id');
  expect(scores.map((score: { valueQuantity: { value: number } }) => score.valueQuantity.value)).toEqual([4.651364, 0, 1.582841, 0, 0, 0, 0, 0]);
  const impression = bundle.entry.find((entry: { resource: { resourceType: string } }) =>
    entry.resource.resourceType === 'ClinicalImpression')?.resource;
  expect(impression.finding).toHaveLength(0);
  expect(bundle.entry.some((entry: { resource: { resourceType: string } }) =>
    entry.resource.resourceType === 'Condition')).toBe(false);
  expect(writes).toEqual([]);
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);

  await card('Angiokeratomas').getByRole('checkbox').uncheck();
  await expect(page.getByRole('heading', { name: 'Rule results' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Download FHIR bundle' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Show results' }).click();
  await expect(fabry).toContainText('Phenotype matching score: 1.583');
  await page.getByRole('button', { name: 'Reset answers' }).click();
  await expect(page.getByRole('heading', { name: 'Rule results' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Download FHIR bundle' })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Choose an assessment' })).toBeVisible();
});

test('mobile keyboard journey shows inline results without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  await page.getByRole('button', { name: 'Show results' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Rule results' })).toBeFocused();
  await expect(page.locator('article.question-card')).toHaveCount(42);
  const dimensions = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
});

test('ADTKD questions omit generic images and produce both weighted results', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  const cysts = page.locator('article.question-card').filter({
    has: page.getByRole('heading', { name: 'Renal corticomedullary cysts', exact: true }),
  });
  await expect(cysts.locator('img')).toHaveCount(0);
  await expect(cysts.locator('details.image-guidance')).toHaveCount(0);
  await page.getByRole('checkbox', { name: 'Mark Gout as present', exact: true }).check();
  await page.getByRole('button', { name: 'Show results' }).click();
  await expect(page.locator('#result-ikd_adtkd_umod')).toBeVisible();
  await expect(page.locator('#result-ikd_adtkd_muc1')).toBeVisible();
});
