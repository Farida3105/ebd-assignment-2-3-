/**
 * Reads what is currently typed into the two boxes.
 *
 * @returns {{ name: string, price: number }}
 */
export function readForm() {
  const name = document.querySelector("#name").value.trim();
  const price = Number(document.querySelector("#price").value);

  return { name, price };
}

/**
 * Empties both boxes.
 *
 * @returns {void}
 */
export function clearForm() {
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = "";
}

/**
 * Draws the list from an array of items, replacing whatever was there before.
 *
 * @param {Array<{name: string, price: number}>} items
 * @returns {void}
 */
export function renderList(items) {
  const list = document.querySelector("#list");

  // Remove all existing cards first.
  list.innerHTML = "";

  // Create a card for every item.
  items.forEach((item) => {
    const card = document.createElement("li");
    card.classList.add("card");

    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const priceElement = document.createElement("p");
    priceElement.classList.add("price");
    priceElement.textContent = `${item.price} EGP`;

    card.append(heading, priceElement);
    list.append(card);
  });
}

/**
 * Handles form submission and validates the input.
 *
 * @returns {void}
 */
export function wireForm() {
  const form = document.querySelector("#product-form");
  const error = document.querySelector("#error");

  // This array stores the products.
  const items = [];

  form.addEventListener("submit", (event) => {
    // Stop the browser from reloading the page.
    event.preventDefault();

    // Read the form values.
    const { name, price } = readForm();

    // Check whether the name is empty.
    if (!name) {
      error.textContent = "Give the product a name.";
      return;
    }

    // Check whether the price is empty, invalid, or not greater than zero.
    const priceInput = document.querySelector("#price");

    if (
      priceInput.value.trim() === "" ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      error.textContent = "Give the product a price.";
      return;
    }

    // The input is valid.
    error.textContent = "";

    // Store the new product.
    items.push({ name, price });

    // Update the webpage.
    renderList(items);

    // Empty the form.
    clearForm();
  });
}
