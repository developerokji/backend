const stateModel = require('../models/state.model.js');

class StateService {
  async getState() {
    return stateModel.getState();
  }
}

module.exports = new StateService();
