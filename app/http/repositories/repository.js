class Repository {

    /**
     * TaskRepository constructor.
     */
    constructor(model) {
        this.model = model
    }

    /**
     * @return {Object}
     */
    findAll = async () =>  await this.model.findAll()

    /**
     * @param {Object} data
     * @return {Object}
     */
    create = async data =>  await this.model.create( data)

    /**
     * @param {Object} where
     * @return {Object}
     */
    findOneWhere = async where =>  await this.model.findOne( where)

    /**
     * @param {Object} where
     * @return {Object}
     */
    findAllWhere = async where =>  await this.model.findAll( where)

    /**
     * @param {Object} where
     * @param {Object} data
     * @return {Object}
     */
    updateWhere = async (where, data) => await this.model.update( data, where)

    /**
     * @param {Object} where
     * @return {Object}
     */
    destroy = async where => await this.model.destroy( where)
}

module.exports = Repository