/* REM Lab catalog: validated read-only source of book metadata.
   The legacy UI still uses embedded book data; no removal or rendering is performed here. */
(function(){
  'use strict';
  const state={status:'loading',books:[],error:null};
  window.REMLabCatalog=Object.freeze({
    get status(){return state.status},
    get books(){return state.books.slice()},
    get error(){return state.error},
    getById(id){return state.books.find(book=>book.id===id)||null},
    ready:null
  });
  const ready=fetch('./lab/catalog/books.json',{cache:'no-store'})
    .then(response=>{if(!response.ok)throw new Error('Catalog HTTP '+response.status);return response.json()})
    .then(data=>{
      if(data.schemaVersion!==1||!Array.isArray(data.books))throw new Error('Unsupported catalog schema');
      const ids=new Set();
      state.books=data.books.map(book=>{
        if(!book||typeof book.id!=='string'||!book.id||typeof book.title!=='string'||!book.title||ids.has(book.id))throw new Error('Invalid or duplicate book');
        ids.add(book.id);
        return Object.freeze({...book,formats:Object.freeze([...(book.formats||[])])});
      });
      state.status='ready';
      document.dispatchEvent(new CustomEvent('rem:catalog-ready',{detail:{count:state.books.length}}));
      return state.books.slice();
    })
    .catch(error=>{state.status='error';state.error=String(error);console.error('REM lab catalog:',error);return []});
  Object.defineProperty(window.REMLabCatalog,'ready',{value:ready,enumerable:true});
})();
