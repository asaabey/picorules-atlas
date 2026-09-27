import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';

test('static viewer preserves both authored IKD sources and question declaration links', async ({ page, request }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  await expect(page.getByRole('heading', { name: 'Ruleblocks in this collection' })).toBeVisible();
  await expect(page.locator('article.ruleblock-card')).toHaveCount(2);
  await expect(page.getByText('They do not contain diagnostic logic')).toBeVisible();

  for (const ruleId of ['ikd_fabry', 'ikd_tuberous_sclerosis']) {
    const card = page.locator('article.ruleblock-card').filter({ has: page.locator(`#rule-title-${ruleId}`) });
    const committed = readFileSync(resolve(process.cwd(), `content/collections/ikd/rules/${ruleId}.prb`), 'utf8');
    await expect(card.locator('pre.rule-source')).toHaveText(committed);
    const href = await card.getByRole('link', { name: /Open exact .prb source/ }).getAttribute('href');
    expect(href).toMatch(new RegExp(`^/generated/ruleblocks/ikd/${ruleId}-[a-f0-9]{16}\\.prb$`));
    const response = await request.get(new URL(href!, page.url()).toString());
    expect(response.ok()).toBe(true);
    expect(await response.text()).toBe(committed);
  }

  for (const question of await page.locator('article.question-card').all()) {
    const featureId = await question.locator('input[type="radio"]').first().getAttribute('name');
    const context = question.locator('details.disease-context');
    await context.locator('summary').click();
    const link = context.getByRole('link', { name: /input declaration/ });
    const target = await link.getAttribute('href');
    expect(target).toMatch(/^#rule-ikd_[a-z_]+-line-\d+$/);
    await expect(page.locator(target!)).toContainText(`#define_attribute(${featureId!.replace('answer-', '')},`);
  }
});

test('keyboard and mobile users can reach the input declaration', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open assessment' }).click();
  const proteinuria = page.locator('article.question-card').filter({
    has: page.getByRole('heading', { name: 'Proteinuria' }),
  });
  const summary = proteinuria.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  const link = proteinuria.getByRole('link', { name: /proteinuria input declaration/ });
  await link.focus();
  await page.keyboard.press('Enter');
  const target = await link.getAttribute('href');
  await expect(page).toHaveURL(new RegExp(`${target}$`));
  await expect(page.locator(target!)).toBeInViewport();
  await expect(page.locator(target!)).toContainText('#define_attribute(proteinuria,');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
