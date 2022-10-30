module.exports = {
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          "tsconfig.json"
        ],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "airbnb-base",
        "airbnb-typescript/base"
      ],
      "rules": {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "@typescript-eslint/no-useless-constructor": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@angular-eslint/no-empty-lifecycle-method": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-shadow": "off",
        "max-len": "off",
        "no-return-assign": "off",
        "no-param-reassign": "off",
        "no-console": "off",
        "no-alert": "off",
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {}
    }
  ]
}
