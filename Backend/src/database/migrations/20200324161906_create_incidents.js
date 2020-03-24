exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
    //chave primeira e id 
    table.increments();

    //campos da tabela
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    //relacionamento da tabela ong com os incidents
    table.string('ong_id').notNullable();

    //chave estrangeira da tabela

    table.foreign('ong_id').references('id').inTable('ongs');
  });
  
};

exports.down = function(knex) {

  knex.schema.dropTable('incidents');
  
};