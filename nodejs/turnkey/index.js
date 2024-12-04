require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Turnkey, DEFAULT_ETHEREUM_ACCOUNTS } = require("@turnkey/sdk-server");

const turnkey = new Turnkey({
  apiBaseUrl: "https://api.turnkey.com",
  apiPrivateKey: process.env.TURNKEY_API_PRIVATE_KEY,
  apiPublicKey: process.env.TURNKEY_API_PUBLIC_KEY,
  defaultOrganizationId: process.env.TURNKEY_ORGANIZATION_ID,
});

const apiClient = turnkey.apiClient();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('It Work'));

app.get('/get-wallet', async (req, res) => {
  try {
    const walletsResponse = await apiClient.getWallets();
    
    res.json({ walletsResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/create-wallet', async (req, res) => {
  try {
    const walletResponse = await apiClient.createWallet({
      walletName: "Example Wallet 1",
      accounts: DEFAULT_ETHEREUM_ACCOUNTS,
    });
    
    const walletId = walletResponse.walletId;
    const accountAddress = walletResponse.addresses[0];

    res.json({ walletId, accountAddress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/get-organization', async (req, res) => {
  try {
    const response = await apiClient.getOrganization();

    const organizationData = response.organizationData;

    res.json({organizationData});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
