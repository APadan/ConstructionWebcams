# Deploying Your Website to HostGator (cPanel)

Everything in this folder is 100% static + PHP-ready for **HostGator** shared/cPanel hosting—no Node.js server or build step required.

## Option 1: 60-Second Upload via HostGator cPanel File Manager (Easiest)

1. Log in to your **HostGator Portal** and click **cPanel** -> **File Manager**.
2. Open the folder for your domain:
   - If `constuction-webcams.com` is your primary domain, open **`public_html/`**.
   - If it is an Addon Domain on your HostGator account, open **`public_html/constuction-webcams.com/`** (or whichever document root folder HostGator created when you added the domain).
3. Click **Upload** at the top of File Manager and upload **`hostgator-upload.zip`**.
4. Right-click **`hostgator-upload.zip`** inside File Manager and click **Extract** (extract directly into that folder so `index.html`, `contact.php`, `css/`, `js/`, and `assets/` sit at the root of the domain folder).
5. Done! Visit your domain in a browser.

## Option 2: Customizing Your Email & Pricing Numbers

- **To change where Quote Form emails are sent:**
  Open `contact.php` (line 14) and `js/main.js` (line 8) and change `info@constuction-webcams.com` to your preferred email address.
- **To adjust Pricing or Calculator numbers:**
  Open `js/main.js` (lines 9–15) and `index.html` (Pricing section) to tweak installation fees or monthly rates anytime.
