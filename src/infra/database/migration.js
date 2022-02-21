class Migration {
  static generate(name, path) {
    const text = `
      const Schema = require('${path}')

      class ${name} {
        static up() {
          Schema.create('table_name', (table) => {
            table.id();

            table.timestamps()
            table.engine = 'InnoDB'
          });
        }
        
        static down() {
          Schema.dropIfExists('table_name');
        }
      }

      module.exports = ${name}
    `
    return text
  }
}

module.exports = Migration


