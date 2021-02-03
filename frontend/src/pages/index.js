import * as Props from '@/prop-types';

import FundingsFeature from '@/components/home/fundings-feature';
import OrganizationsFeature from '@/components/home/organizations-feature';
import Page from '@/components/layout/page';
import PageContent from '@/components/layout/page-content';
import PropTypes from 'prop-types';
import SearchHero from '@/components/home/search-hero';
import { fetchOrganizations } from '@/components/organizations/use-organizations';
import { fetchfundings } from '@/components/fundings/use-fundings';
import { getLayout } from '@/components/layout/app-layout';
import { useRouter } from 'next/router';

Home.propTypes = {
  /**
   * @type {object[]}
   */
  fundings: PropTypes.arrayOf(Props.funding),

  /**
   * @type {object[]}
   */
  organizations: PropTypes.arrayOf(Props.organization)
};

function Home({ fundings, organizations }) {
  const router = useRouter();

  const onSearch = keywords => {
    // Navigate to search results page when searching through the hero bar
    return router.push('/search/[keywords]', `/search/${encodeURIComponent(keywords)}`);
  };

  // Navigate to corresponding organization post page using its id when clicking on featured organization card
  const onOrganizationClick = organization =>
    router.push('/organizations/[id]', `/organizations/${encodeURIComponent(organization.id)}`);

  return (
    <Page>
      <SearchHero className="w-full" onSearch={onSearch} />
      <PageContent container>
        <div className="flex flex-col w-full lg:flex-row">
          <OrganizationsFeature
            title="Featured organizations"
            organizations={organizations}
            onOrganizationClick={onOrganizationClick}
            className="w-full lg:w-2/3"
          />
          <FundingsFeature
            title="Popular fundings"
            fundings={fundings}
            className="w-full mt-10 lg:w-1/3 lg:ml-4"
          />
        </div>
      </PageContent>
    </Page>
  );
}

Home.getLayout = getLayout;

// This gets called at build time
export async function getStaticProps() {
  const { fundings } = await fetchfundings({ limit: 5 });
  const { organizations } = await fetchOrganizations({ limit: 5 });

  return {
    props: { fundings, organizations }
  };
}

export default Home;
