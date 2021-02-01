import * as Props from '@/prop-types';

import Page from '@/components/layout/page';
import PageContent from '@/components/layout/page-content';
import PropTypes from 'prop-types';
import { getLayout } from '@/components/layout/app-layout';

Home.propTypes = {
  /**
   * @type {object[]}
   */
  fundings: PropTypes.arrayOf(Props.job),

  /**
   * @type {object[]}
   */
  organizations: PropTypes.arrayOf(Props.category)
};

function Home({ fundings, organizations }) {
  return (
    <Page>
      <PageContent container>
        <div className="flex flex-col w-full lg:flex-row">
          <h1>Hello, dear future Motherbrain developer!</h1>

          <p>
            This is a code test that is meant to test your creativity and problem solving skills.
          </p>

          <p>
            Don&apos;t panic! We won&apos;t judge you for hacky code, we simply want you to solve a
            problem for us in any way you want.
          </p>

          <p>
            This repository is a barebones setup with a Node backend and a React frontend. If you
            really want to, you can tear it all down and start from scratch, but this is meant to
            get you started immediately.
          </p>

          <h2>The Challenge</h2>

          <p>
            We have configured this repository with a connection to an ElasticSearch node, with two
            prepopulated indices:
          </p>

          <ul>
            <li>
              <code>org</code> – A collection of organizations. Accessed via{' '}
              <code>http://localhost:8080/orgs</code>.
            </li>
            <li>
              <code>funding</code> – A collection of{' '}
              <a href="https://techcrunch.com/2017/01/08/wtf-is-a-funding-round/">funding rounds</a>
              . Accessed via <code>http://localhost:8080/fundings</code>.
            </li>
          </ul>

          <p>
            The code for these endpoints can be found in <code>backend/src/index.js</code>.
          </p>

          <p>
            We want you to{' '}
            <strong>
              explore and create a chart or graph of any aspect of the data. Use any charting
              library you want or whip something up yourself if you prefer that. Points for
              creativity, both in aesthetics and in data analysis.
            </strong>
          </p>

          <p>
            Here is a simple table version of the data. How will <em>you</em> make it more fun?
          </p>

          <p style={{ color: 'red' }}>Good Luck!</p>
        </div>
      </PageContent>
    </Page>
  );
}

Home.getLayout = getLayout;

// This gets called at build time
export async function getStaticProps() {
  // const featuredJobs = await fetchJobs({ featured: true }, { limit: 5 });
  // const featuredCategories = await fetchCategories({ limit: 6 });

  return {
    props: { fundings: [], organizations: [] },
    // Refresh featured jobs and categories every 5m
    revalidate: 300
  };
}

export default Home;
