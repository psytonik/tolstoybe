Here's a refined version for your GitHub documentation:

---

## How to Install the Server on Render

1. **Register** an account on [Render](https://render.com/).

2. **Create a New Web Service**:
    - Click on "New Web Service."
    - Select your GitHub repository under "Source Code" and click "Connect."

3. **Configure the Service**:
    - Set the language to `Node`.
    - Choose the `Main` branch.
    - Enter the following Build Command: `npm install && npm run build`.
    - Enter the following Start Command: `npm run start build/app.js`.

4. **Set Environment Variables**:
    - Add `PORT` with a value of `5001`.

5. **Deploy**:
    - Click on "Deploy Web Service" to start the deployment process.

Once the server is deployed, you will receive a URL like `https://YOURNAME.onrender.com`. The server will support only one method: `POST`.
