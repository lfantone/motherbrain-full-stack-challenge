import Button from '@/components/core/button';
import LineIcon from '@/components/core/line-icon';
import OrganizationCardList from '@/components/organizations/organization-card-list';
import OrganizationDetailsCard from '@/components/organizations/organization-details-card';
import OrganizationSummary from '@/components/organizations/organization-summary';
import useOrganizations, {
  fetchOrganizations,
  fetchSingleOrganization
} from '@/components/organizations/use-organizations';
import { getLayout } from '@/components/layout/app-layout';
import Page from '@/components/layout/page';
import PageContent from '@/components/layout/page-content';
import * as Props from '@/prop-types';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';
import { useMemo } from 'react';
import extractIds from '@/utils/extract-ids';

OrganizationPost.propTypes = {
  /**
   * @type {Object}
   */
  organization: Props.organization
};

function OrganizationPost({ organization }) {
  const router = useRouter();

  const onBack = keywords => {
    // Go back to search page and display results from searching this organization name
    return router.push('/search/[keywords]', `/search/${encodeURIComponent(keywords)}`);
  };

  const onOrganizationClick = organization => {
    // Go back to search page and display results from searching this organization name
    return router.push(
      '/organizations/[id]',
      `/organizations/${encodeURIComponent(organization.id)}`
    );
  };

  // Get related organization by searching other organizations using the main organization name as keywords
  const query = useMemo(() => (isNil(organization?.name) ? null : { q: organization.name }), [
    organization
  ]);
  const { data: relatedOrganizations } = useOrganizations(query);

  return (
    <Page className="bg-page-network" headTitle={organization?.name}>
      <PageContent container>
        <Button
          className="max-w-xs font-normal truncate lg:max-w-lg"
          variant="text"
          onClick={() => onBack(organization.name)}
          startIcon={<LineIcon icon="arrow-left" className="pl-1" />}
        >
          More organization like &quot;{organization?.name}&quot;
        </Button>
        {organization && (
          <OrganizationSummary
            city={organization?.city}
            country={organization?.country}
            employeeCount={organization?.employeeCount}
            name={organization?.name}
            title={organization?.name}
            url={organization?.url}
          />
        )}
        <div className="flex flex-col mt-5 space-y-5 lg:flex-row lg:space-x-2 lg:space-y-0">
          {organization && (
            <OrganizationDetailsCard
              className="w-full lg:w-2/3 rounded-3xl"
              name={organization?.company}
              description={organization?.description}
              fundings={organization?.fundings?.rounds}
              shortDescription={organization?.shortDescription}
              total={organization?.fundings?.total}
            />
          )}
          <section className="w-full lg:w-1/3">
            <h4 className="mb-3 text-lg font-bold animate-fade-in-bck">Related organizations</h4>
            <OrganizationCardList
              onOrganizationClick={onOrganizationClick}
              organizations={relatedOrganizations}
              size="sm"
            />
          </section>
        </div>
      </PageContent>
    </Page>
  );
}

OrganizationPost.getLayout = getLayout;

// This function gets called at build time
export async function getStaticPaths() {
  // Pre-fetch all available organizations to generate dynamic paths based on their ids
  const { organizations } = await fetchOrganizations();

  // We'll generate all static organization description pages using their ids as the
  // path (e.g.: `/organizations/08fe`) during build-time
  // Other pages not pre-generated on build (i.e.: new organization postings) will `fallback` and be
  // automatically generated on the fly when requested for the first time
  return { paths: extractIds(organizations), fallback: true };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the organization `id`.
  // If the route is like `/organization/08fe`, then params.id is `08fe`
  const organization = await fetchSingleOrganization(params.id);

  // Pass post data to the page via static props
  return { props: { organization }, revalidate: 600 };
}

export default OrganizationPost;
