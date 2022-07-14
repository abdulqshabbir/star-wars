import fetch from 'node-fetch'

export default function getResources(paths, fields) {
    return Promise
        .all([
            ...paths.map(path => fetch(path))
        ])
        .then(responses => {
            return Promise.all([
                ...responses.map(response => response.json())
            ])
        })
        .then(dataArray => {
            const resources = createResourcesUsingFields(dataArray, fields)
            return resources
        }).catch(e => {
            console.log(e)
            return null
        })
}

function createResourcesUsingFields(dataArray, fields) {
    const resources = []

    for (let data of dataArray) {
        const resource = fields.reduce((acc, field) => {
            if (field in data) {
                acc[field] = data[field]
                return acc
            }
            return acc
        }, {})
        resources.push(resource)
    }
    return resources
}