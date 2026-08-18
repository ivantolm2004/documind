import test from'node:test';import assert from'node:assert/strict';import{buildIndex,chunkDocument,highlight,search,tokenize}from'../src/search.js';
const docs=[{id:'contract',name:'contract.txt',text:'Оплата производится в течение 10 рабочих дней.\n\nЗа просрочку начисляется пеня 0,1 процента.'},{id:'returns',name:'returns.txt',text:'Возврат товара доступен в течение 14 дней.'}];
test('tokenizes consistently, stems words and removes stop words',()=>assert.deepEqual(tokenize('Оплата в течение 10 дней'),['оплат','течени','10','дней']));
test('creates addressable paragraph chunks',()=>{const chunks=chunkDocument(docs[0]);assert.equal(chunks.length,2);assert.equal(chunks[1].paragraph,2)});
test('ranks the relevant citation first',()=>{const result=search(buildIndex(docs),'какой срок оплаты');assert.equal(result[0].name,'contract.txt');assert.equal(result[0].paragraph,1);assert.ok(result[0].score>0)});
test('returns no citation for unrelated terms',()=>assert.deepEqual(search(buildIndex(docs),'телефон менеджера'),[]));
test('highlights matched terms',()=>assert.equal(highlight('Срок оплаты',['оплаты']),'Срок <mark>оплаты</mark>'));
