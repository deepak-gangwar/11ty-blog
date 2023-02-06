const sanityClient = require('@sanity/client')

const client = sanityClient({
    projectId: '69q6zifp',
    dataset: 'production',
    // token: 'your-token', // optional
    useCdn: false, // optional
    apiVersion: "2022-02-03"
})

module.exports = async function () {
    const query = `
    *[ _type == "post" && !(_id in path("drafts.**")) ]{
      title,
      slug { current },
      categories,
      publishedAt,
      body
    } | order(publishedAt desc)
    `
    // const query = '*[_type == "post"]'
    const params = {}

    const data = await client.fetch(query, params)
    return data
}


