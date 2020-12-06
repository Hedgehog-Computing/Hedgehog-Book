'use strict';

module.exports = {
  website: {
    assets: './assets_diy',
    css: [
      'diy.css'
    ]
  },
  hooks: {
    init: function init() {
      var _this$config$get = this.config.get('pluginsConfig.diy')
    },
    "page:before": function pageBefore(page) {

      page.content = page.content.replace(/([\n\s]*)\{([^}]+)\}\(([^)]+)\)(\s*(?:$|\n+))/g, function (mats, beginCharacter, type, url, endCharacter) {
        let width = "100%"
        let height = "500"
        if (type === "video") {
          width = "640"
          height = "264"
        }
        let typesMatchs = {
          'iframe': `<iframe id="iframe" width="${width}" height="${height}" allowTransparency="true" src="${url}" frameborder="0" marginheight="0" marginwidth="0"></iframe>`,
          "video": `<video width="${width}" height="${height}" controls="controls" src="${url}" preload="preload"></video>`,
          "audio": `<audio controls src="${url}"></audio>`
        }

        return typesMatchs[type] ? `${beginCharacter + typesMatchs[type] + endCharacter}` : mats

      })

      return page;

    }
  }
};
