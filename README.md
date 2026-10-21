# 4G Beverages On the Go

A responsive static website preview for the 4G Mageu flavour range. Product prices, inventory, delivery fees, and business contact information are intentionally unset until confirmed.

## Preview locally

Open `index.html` in a browser. The page uses Google Fonts and illustrative Unsplash images, so those assets require an internet connection.

## Deploy to Render

This project is configured as a Render Static Site in `render.yaml`. The build command copies only `index.html` into `public/`, which is the publish directory; project files such as this README and the Blueprint are not published.

1. Push this folder to a Git provider supported by Render (GitHub, GitLab, or Bitbucket).
2. In the Render Dashboard, choose **New > Blueprint** and connect the repository.
3. Review the `4g-beverages-on-the-go` static site and apply the Blueprint.
4. Wait for the deploy to finish, then use the `onrender.com` URL shown in the service dashboard.

No environment variables are required for this static preview. For a manual Static Site instead, set the build command to `mkdir -p public && cp index.html public/index.html` and the publish directory to `public`.

## Business configuration

The preview's editable `CONFIG` object is in the script near the end of `index.html`. Product prices, stock, the delivery fee, and business contact values are null by default. Do not publish guessed business details. Product pricing and stock must be configured before enabling purchases.

The site currently blocks add-to-cart and checkout because those details are not configured. The contact form only displays an on-page message; it does not send email. A WhatsApp order link is not enabled because no business number has been supplied.

## Before accepting orders or payments

A Render Static Site serves files only; it cannot securely handle orders or verify payments. Before accepting real orders, add a backend service (and persistent order storage) that:

- Calculates totals and checks current prices and stock on the server, rather than trusting browser values.
- Creates an order and initiates payment with PayFast or Yoco using credentials stored only in the backend's Render environment variables.
- Verifies signed gateway callbacks/webhooks on the server before marking an order paid or showing confirmation.
- Handles order status, fulfilment selection, delivery fees, failures, retries, and customer notifications.

Do not collect or store card details in this website, put payment secrets in `index.html` or `render.yaml`, or treat a browser redirect as proof of payment. The current confirmation view explicitly does not claim an order was placed.

Before launch, replace illustrative images with approved product photography and configure confirmed prices, stock, delivery/collection terms, business email/phone, and any WhatsApp number. Add the backend URL and integration settings only when the real services are implemented.
