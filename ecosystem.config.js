module.exports = {
  apps: [{
    name: "activityrankweb",
    script: "app.js",
    args: "",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
