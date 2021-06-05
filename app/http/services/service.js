class Service {

    /**
     * TaskRepository constructor.
     */
    constructor(repository) {
        this.repository = repository
    }

    /**
     * @return {Object}
     */
    findAll = async () =>  await this.repository.findAll()

    /**
     * @param {Object} data
     * @return {Object}
     */
    create = async data =>  await this.repository.create( data)

    /**
     * @param {Object} where
     * @return {Object}
     */
    findOneWhere = async where =>  await this.repository.findOneWhere( where)

    /**
     * @param {Object} where
     * @return {Object}
     */
    findAllWhere = async where =>  await this.repository.findAllWhere( where)

    /**
     * @param {Object} where
     * @param {Object} data
     * @return {Object}
     */
    updateWhere = async (where, data) => await this.repository.updateWhere( where, data)

    /**
     * @param {Object} where
     * @return {Object}
     */
    destroy = async where => await this.repository.destroy( where)
}

module.exports = Service