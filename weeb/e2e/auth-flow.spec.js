import { test, expect } from "@playwright/test";

const adminEmail = process.env.E2E_ADMIN_EMAIL;
const adminPassword = process.env.E2E_ADMIN_PASSWORD;

test.skip(!adminEmail || !adminPassword, "Missing E2E_ADMIN_EMAIL or E2E_ADMIN_PASSWORD.");

test("signup login create article flow", async ({ page }) => {

  const userEmail = `e2e_${Date.now()}@example.com`;
  const userPassword = "WeebE2E#4821";

  await page.goto("/signup");
  await page.getByPlaceholder("Prenom").fill("Test");
  await page.getByPlaceholder("Nom").fill("User");
  await page.getByPlaceholder("Email").fill(userEmail);
  await page.getByPlaceholder("Mot de passe").fill(userPassword);
  const registerResponse = Promise.race([
    page.waitForResponse(
      (response) =>
        response.url().includes("/api/auth/register/") &&
        response.request().method() === "POST"
    ),
    page.waitForEvent("requestfailed", (request) =>
      request.url().includes("/api/auth/register/")
    ),
  ]);
  await page.getByRole("button", { name: "Creer mon compte" }).click();

  const registerResult = await registerResponse;
  if (typeof registerResult.status === "function") {
    const status = registerResult.status();
    if (status !== 201) {
      const body = await registerResult.text();
      throw new Error(`Register failed (status ${status}): ${body}`);
    }
  } else {
    const failure = registerResult.failure();
    throw new Error(`Register request failed: ${failure?.errorText || "unknown error"}`);
  }

  await expect(page.getByText("Compte cree")).toBeVisible();

  await page.goto("/login");
  await page.getByPlaceholder("Email").fill(adminEmail);
  await page.getByPlaceholder("Mot de passe").fill(adminPassword);
  await page.getByRole("button", { name: "Se connecter" }).click();
  await expect(page.getByText("Moderation")).toBeVisible();

  await page.goto("/admin/moderation");
  const card = page.locator(`[data-email="${userEmail}"]`);
  await expect(card).toBeVisible();
  await card.getByRole("button", { name: "Activer" }).click();
  await expect(card.getByText("Actif")).toBeVisible();

  await page.getByRole("button", { name: "Se deconnecter" }).click();

  await page.goto("/login");
  await page.getByPlaceholder("Email").fill(userEmail);
  await page.getByPlaceholder("Mot de passe").fill(userPassword);
  await page.getByRole("button", { name: "Se connecter" }).click();

  await expect(page.getByText("Identifiants invalides")).not.toBeVisible({ timeout: 2000 });
  const publishCTA = page.getByRole("link", { name: "Publier un article" });
  await expect(publishCTA).toBeVisible();

  const publishLink = page.getByRole("link", { name: "Publier un article" });
  await expect(publishLink).toBeVisible();
  await publishLink.click();
  await expect(page).toHaveURL(/\/articles\/new$/);
  await page.getByPlaceholder("Titre").fill("Article E2E");
  await page.getByPlaceholder("Contenu").fill("Contenu de test pour le parcours e2e.");
  await page.getByRole("button", { name: "Publier" }).click();
  await expect(page).toHaveURL(/\/articles$/);
});
