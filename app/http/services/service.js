class Service {

    /**
     * TaskRepository constructor.
     */
    constructor(repository) {
        this.repository = repository
    }

    /**
     * @param {array|Object} fields
     * @return {Object}
     */
    findAll = async (fields={exclude:[]}) =>  await this.repository.findAll( fields)

    /**
     * @param {Object} data
     * @return {Object}
     */
    create = async data =>  await this.repository.create( data)

    /**
     * @param {Object} where
     * @param {array|Object} fields
     * @return {Object}
     */
    findOneWhere = async (where, fields={exclude:[]}) =>  await this.repository.findOneWhere( where, fields)

    /**
     * @param {Object} where
     * @param {array|Object} fields
     * @return {Object}
     */
    findAllWhere = async (where, fields={exclude:[]}) =>  await this.repository.findAllWhere( where, fields)

    /**
     * @param {Object} where
     * @param {array|Object} data
     * @return {Object}
     */
    updateWhere = async (where, data) => await this.repository.updateWhere( where, data)

    /**
     * @param {array|Object} where
     * @return {Object}
     */
    destroy = async where => await this.repository.destroy( where)
}

module.exports = Service