class DataProcessor {
  constructor(topClaimId, notifyCallback) {
    this.topClaimId = topClaimId;
    this.when = new Date();
    this.notify = notifyCallback;

    if (!window.ReasonScore) window.ReasonScore = {};
    if (window.ReasonScore.data)
      this.data = window.ReasonScore.data
    else
      this.data = {};
      
    //Set up singleton transaction processor
    if (!window.ReasonScore.TransactionProcessors) {
      window.ReasonScore.TransactionProcessors = [];
    }
    window.ReasonScore.TransactionProcessors.push(this.processTransaction.bind(this))
  }

  notify() {
    //this function will be replaced by the calling function. Left here to prevent coding errors.
  }

  getClaim(claimId) {
    //Pull the claims from the local store
    const claims = Object.values(this.data.items).filter(claim =>
      claim.id === claimId
      && new Date(claim.start) <= this.when
      && new Date(claim.end) > this.when
    )
    if (claims.length < 1) { debugger; }
    return claims[0];
  }

  getArguments(parent, ancestors, when) {
    return Object.values(this.data.items).filter(edge =>
      edge.parent === parent
      && new Date(edge.start) <= this.when
      && new Date(edge.end) > this.when
      && (ancestors.includes(edge.scope)
        || edge.scope === parent))
  }

  sendTransaction(transaction) {
    var id = this.newId();
    var start = new Date().toJSON();
    //var end = "3000-01-01T00:00:00.000Z";
    for (const action of transaction) {
      action.ver = this.newId();
      action.trans = id;
      action.start = start;
    };

    for (const processTransaction of window.ReasonScore.TransactionProcessors) {
      processTransaction(transaction)
    }
  }

  processTransaction(transaction) {
    const items = this.data.items;
    for (const action of transaction) {
      items[action.ver] = { ...action.old, ...action.new, ver: action.ver, start: action.start, end: "3000-01-01T00:00:00.000Z" };
      if (action.old) {
        items[action.old.ver] = { ...action.old, end: action.start }
      }
      this.when = new Date(action.start);
      this.notify();
    }
  }

  newId() {
    // take the current UTC date and convert to base 62
    let decimal = 5000000000000 - new Date();
    const s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let result = '';
    while (decimal >= 1) {
      result = s[(decimal - (62 * Math.floor(decimal / 62)))] + result;
      decimal = Math.floor(decimal / 62);
    }

    // Add 5 extra random characters in case multiple ids are creates at the same time
    result += Array(5).join().split(',').map(() => s[(Math.floor(Math.random() * s.length))])
      .join('');

    return result;
  }
}

export default DataProcessor;
