'use strict';

(async () => {
  let config = await loadConfig();

  // Dat.GUI config
  let guiConfig = {};
  guiConfig[ config.timeout.label ] = config.timeout.value;
  guiConfig[ config.checkInterval.label ] = config.checkInterval.value;
  guiConfig[ config.activeWindow.label ] = config.activeWindow.value;
  guiConfig[ config.excludedWebsites.label ] = config.excludedWebsites.value.join(", ");

  // Initialize dat.GUI
  let gui = new dat.GUI({
    autoPlace: false
  });
  gui.domElement.id = 'gui_css';

  // Add timeout setting to dat.GUI, set up event handler
  gui.add(guiConfig, config.timeout.label, 1, 43200, 1).onChange(onChange);

  // Add check interval setting to dat.GUI, set up event handler
  gui.add(guiConfig, config.checkInterval.label, 0, 60, 1).onChange(onChange);

  // Add active window setting to dat.GUI, set up event handler
  gui.add(guiConfig, config.activeWindow.label).onChange(onChange);

  // Add list of excluded websites setting to dat.GUI, set up event handler
  gui.add(guiConfig, config.excludedWebsites.label).onChange(onChange);

  // Add dat.GUI to extension UI
  document.body.appendChild(gui.domElement);

  async function onChange() {
    config.timeout.value = guiConfig[ config.timeout.label ];
    config.checkInterval.value = guiConfig[ config.checkInterval.label ];
    config.activeWindow.value = guiConfig[ config.activeWindow.label ];
    config.excludedWebsites.value = guiConfig[ config.excludedWebsites.label ].split(/[ ,]+/);
    saveConfig(config);
  }

  // Test for clearing local storage
  async function clear() {
    await browser.storage.local.clear().then(() => console.log('cleared'), e => console.log(e));
  }
  //
})();
