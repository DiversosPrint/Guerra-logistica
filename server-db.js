const { Pool } = require('pg');
let pool;
function db(){if(!process.env.DATABASE_URL)return null;if(!pool)pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false}});return pool}
async function readState(){const p=db();if(!p)return null;await p.query('CREATE TABLE IF NOT EXISTS guerra_state (id integer primary key, payload jsonb not null, updated_at timestamptz not null default now())');const r=await p.query('SELECT payload FROM guerra_state WHERE id=1');return r.rows[0]?.payload||{vehicles:[]}}
async function writeState(payload){const p=db();if(!p)return false;await p.query('CREATE TABLE IF NOT EXISTS guerra_state (id integer primary key, payload jsonb not null, updated_at timestamptz not null default now())');await p.query('INSERT INTO guerra_state(id,payload) VALUES(1,$1) ON CONFLICT(id) DO UPDATE SET payload=$1,updated_at=now()',[payload]);return true}
module.exports={readState,writeState};
