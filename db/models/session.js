const neo4j = require('neo4j-driver')
const db = require('../db')

var driver = neo4j.driver(
  'neo4j://localhost',
  neo4j.auth.basic('neo4j', 'neo4j')
)

var session = driver.session({})

session.run('MERGE (v1:Volunteer)-[rel:HAS_ATTENDED]->(v2:Volunteer)')
