import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class History extends React.Component {
  render() {
    const { data } = this.props
    console.log('-------data-----------', data)

    const { edges: histories } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {histories &&
          histories.map(({ node: history }) => (
            <div className="is-parent column is-6" key={history.id}>
              <article
                className={`blog-list-item tile is-child box notification ${
                  history.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={history.fields.slug}
                    >
                      {history.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {history.frontmatter.date}
                    </span>
                  </p>
                </header>
                <p>
                  {history.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={history.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

History.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
}

export default () => (
  <StaticQuery
    query={graphql`
      query HistoryQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "history-page" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 1000)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <History data={data} count={count} />}
  />
)
