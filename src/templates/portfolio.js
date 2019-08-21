import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {getPages, Link, safePrefix} from '../utils';

export default class Portfolio extends React.Component {
    render() {
        let display_projects = _.orderBy(getPages(this.props.pageContext.pages, '/projects'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            <div class="outer">
              <div class="inner">
                <header class="page-header inner-small">
                  <h1 class="page-title line-top">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                  {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                  <p class="page-subtitle">{_.get(this.props, 'pageContext.frontmatter.subtitle')}</p>
                  }
                </header>
                <div class={'portfolio-feed layout-' + _.get(this.props, 'pageContext.frontmatter.layout_style')}>
                  {_.map(display_projects, (post, post_idx) => (
                  <article key={post_idx} class="post project">
                    <Link to={safePrefix(_.get(post, 'url'))} class="post-link">
                      {_.get(post, 'frontmatter.thumb_img_path') && 
                      <div class="post-thumbnail">
                        <img class="thumbnail" src={safePrefix(_.get(post, 'frontmatter.thumb_img_path'))} alt={_.get(post, 'frontmatter.title')} />
                      </div>
                      }
                      <header class="post-header">
                        <h2 class="post-title">{_.get(post, 'frontmatter.title')}</h2>
                      </header>
                    </Link>
                  </article>
                  ))}
                </div>
              </div>
            </div>
            </Layout>
        );
    }
}