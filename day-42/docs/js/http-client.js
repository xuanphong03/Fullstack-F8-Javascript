export const httpClient = {
  name: "httpClient",
  baseUrl: null,
  requestConfig: null,
  responseConfig: null,
  create: function ({ baseUrl, headers = {} }) {
    this.baseUrl = baseUrl;
    const instance = { ...this };
    instance.baseUrl = baseUrl;
    instance.headers = headers;
    return instance;
  },
  request: function (callback) {
    if (typeof callback === "function") {
      this.requestConfig = callback;
    }
  },
  response: function (callback) {
    if (typeof callback === "function") {
      this.responseConfig = callback;
    }
  },
  send: async function (path, method = "GET", body = null, headers = {}) {
    try {
      let url = path;
      if (this.baseUrl) {
        url = `${this.baseUrl}${path}`;
      }
      const options = {
        method,
        headers: { ...this.headers, ...headers },
      };
      if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json";
      }
      let initialRequest = { ...options };
      if (this.requestConfig) {
        initialRequest = this.requestConfig(initialRequest);
      }
      const response = await fetch(url, initialRequest);
      // if (!response.ok) {
      //   throw new Error("Fetch to failed");
      // }
      let responseClone = response.clone();
      if (this.responseConfig) {
        responseClone = await this.responseConfig(responseClone);
      }
      if (responseClone.name === "httpClient") {
        // Xử lý gọi lại
        return this.send(path, method, body, headers);
      }
      const data = await response.json();
      responseClone.data = data;
      return responseClone;
    } catch (error) {
      return false;
    }
  },
  get: function (path, headers = {}) {
    return this.send(path, "GET", null, headers);
  },
  post: function (url, body = null, headers = {}) {
    return this.send(url, "POST", body, headers);
  },
  put: function (path, body = null, headers = {}) {
    return this.send(path, "PUT", body, headers);
  },
  patch: function (path, body = null, headers = {}) {
    return this.send(path, "PATCH", body, headers);
  },
  delete: function (path, headers = {}) {
    return this.send(path, "DELETE", null, headers);
  },
};

// httpClient.get('/path')
// httpClient.post('/path', body)
// httpClient.put('/path', body)
// httpClient.patch('/path', body)
// httpClient.delete('/path')
