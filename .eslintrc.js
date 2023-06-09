module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
  },
  "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    // "plugins": [
    //   "react"
    // ],
    // "extends": ["eslint:recommended", "plugin:react/recommended"],
    // "rules": {
    //     "comma-dangle": 0,
    //     "react/jsx-uses-vars": 1,
    //     "react/display-name": 1,
    //     "no-unused-vars": "warn",
    //     "no-console": 1,
    //     "no-unexpected-multiline": "warn"
    // },
};
