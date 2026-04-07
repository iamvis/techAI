const http = require("http");

const request = (options, body) =>
  new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });

    req.on("error", reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });

(async () => {
  try {
    const productId = "69d4a650b215f76f1d9408db";
    const addResponse = await request(
      {
        host: "localhost",
        port: 5000,
        path: "/api/cart",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      { productId, quantity: 2 }
    );

    console.log("ADD", addResponse.status, addResponse.body);

    const listResponse = await request({ host: "localhost", port: 5000, path: "/api/cart", method: "GET" });
    console.log("LIST", listResponse.status, listResponse.body);

    const items = JSON.parse(listResponse.body || "[]");
    if (!Array.isArray(items) || items.length === 0) {
      console.error("No cart items returned");
      process.exit(1);
    }

    const cartId = items[0]._id;
    const deleteResponse = await request({ host: "localhost", port: 5000, path: `/api/cart/${cartId}`, method: "DELETE" });
    console.log("DELETE", deleteResponse.status, deleteResponse.body);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
