import * as merge from 'lodash.merge'
import query from '@ecomplus/search-engine/src/lib/dsl'

export default (self, term) => {
  const arr = (term || '').split(' ')
  /* const removeChar = (arr) => { 
    if (arr.length === 1) {
      return arr[0].replace(/(es)|s$/g, '')
    }
  } */
  const fromTo = (arr) => {
    const newArr = arr.map(word => {
        const lower = word.toLowerCase()
        switch (lower) {
          case 'alu':
          case 'alum':
          case 'aluminio':
          case 'lumínio':
            return 'alumínio'
          case 'cetico':
          case 'acetico':
            return 'acético'
          case 'termica':
          case 'termico':
          case 'termicos':
          case 'termicas':
            return 'térmica'
          default:
            return lower
        }
    })
    if (arr.length === 2) {
      console.log(arr)
      switch(arr[0] + ' ' + arr[1]) {
        case 'manta t':
            return 'manta térmica'
      }
    }
    if (arr.length === 3) {
        console.log(arr)
      /* switch(arr[0] + ' ' + arr[1] + ' ' + arr[2]) {
        
      } */
    }
    return newArr.join(' ')
  }
  // match name and/or keyword with term
  // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
  if (term) {
    const sort = query.sort.slice()
    const relevanceSortIndex = sort.findIndex(s => s.ad_relevance)
    sort.splice(relevanceSortIndex, 1)
    self.dsl.sort = sort
  }
  const modifiedTerm = fromTo(arr)
  const finalTerm = modifiedTerm || term
  const regDig = /\d/
  self.mergeFilter({
    multi_match: {
      query: finalTerm,
      type: finalTerm.length > 5 
      ? 'best_fields'
      : regDig.test(finalTerm)
      ? 'best_fields'
      : 'phrase_prefix',
      fields: [
        'name',
        'keywords'
      ]
    }
  }, 'must')
  
  merge(self.dsl, {
    // handle terms suggestion
    // 'did you mean?'
    // https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html
    suggest: {
      text: term,
      words: {
        term: {
          field: 'name'
        }
      }
    }
  })
  return self
}

/**
 * @method
 * @name EcomSearch#setSearchTerm
 * @description Defines term to match with product name
 * and/or keywords on next search request.
 *
 * @param {string} term - Term to be searched
 * @returns {self}
 *
 * @example

// Set new search term
search.setSearchTerm('smartphone')

 * @example

// Set new term and run search request
search.setSearchTerm('notebook').fetch()

 */
