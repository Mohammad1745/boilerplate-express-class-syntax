class Repository {

    /**
     * TaskRepository constructor.
     */
    constructor(model) {
        this.model = model
    }

    /**
     * @param {array|Object} fields
     * @return {Object}
     */
    findAll = async (fields={exclude:[]}) =>  await this.model.findAll({attributes:fields})

    /**
     * @param {Object} data
     * @return {Object}
     */
    create = async data =>  await this.model.create( data)

    /**
     * @param {Object} where
     * @param {array|Object} fields
     * @return {Object}
     */
    findOneWhere = async (where, fields={exclude:[]}) =>  await this.model.findOne({ where:where, attributes: fields})

    /**
     * @param {Object} where
     * @param {array|Object} fields
     * @return {Object}
     */
    findAllWhere = async (where, fields={exclude:[]}) =>  await this.model.findAll({ where:where, attributes: fields})

    /**
     * @param {Object} where
     * @param {Object} data
     * @return {Object}
     */
    updateWhere = async (where, data) => await this.model.update( data, {where:where})

    /**
     * @param {Object} where
     * @return {Object}
     */
    destroy = async where => await this.model.destroy( {where:where})
}

module.exports = Repository