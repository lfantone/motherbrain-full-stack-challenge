import Button from '@/components/core/button';
import LineIcon from '@/components/core/line-icon';
import FundingsFeature from '@/components/home/fundings-feature';
import OrganizationCardList from '@/components/organizations/organization-card-list';
import useOrganizations from '@/components/organizations/use-organizations';
import useFundings from '@/components/fundings/use-fundings';
import { getLayout } from '@/components/layout/app-layout';
import Page from '@/components/layout/page';
import PageContent from '@/components/layout/page-content';
import SearchBar from '@/components/search/search-bar';
import SearchError from '@/components/search/search-error';
import useKeywords from '@/components/search/use-keywords';
import * as Props from '@/prop-types';
import { isNotNilOrEmpty } from '@flybondi/ramda-land';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'ramda';
import { useMemo } from 'react';

Search.propTypes = {
  /**
   * @type {Object[]}
   */
  featuredFundings: PropTypes.arrayOf(Props.funding)
};

/**
 * @type {readonly Object}
 */
const fundingsQuery = Object.freeze({ limit: 6 });

function Search({ featuredFundings }) {
  const router = useRouter();
  const [keywords, setKeywords] = useKeywords();

  const onSearch = keywords => {
    setKeywords(keywords);

    if (isNotNilOrEmpty(keywords)) {
      // Show new search in the browser's URL only if `keywords` is not empty
      // (i.e.: user cleared the input)
      router.replace('/search/[keywords]', `/search/${encodeURIComponent(keywords)}`, {
        shallow: true
      });
    }
  };

  // Fetch featured fundings
  const { data: fundings } = useFundings(fundingsQuery);

  // Compute organization search request query from input keywords and avoid
  // re-creating a `{ q: keywords }` object on every render
  const query = useMemo(() => (isNil(keywords) ? null : { q: keywords, limit: 50 }), [keywords]);

  // Trigger a new search each time `keywords` change (i.e.: user submits search input value)
  const { data: organizations, error } = useOrganizations(query);

  // Redirect to job description page when clicking on a result card
  const onOrganizationClick = organization =>
    router.push('/organizations/[id]', `/organizations/${encodeURIComponent(organization.id)}`);

  // Search results title indicating count of results
  const title = useMemo(
    () =>
      isNil(organizations) ? null : isEmpty(organizations) ? (
        <>
          &quot;<i>{keywords}</i>&quot; did not match any organizations.
        </>
      ) : (
        <>
          {organizations.length} {organizations.length === 1 ? 'result' : 'results'} for &quot;
          <i>{keywords}&quot;</i>
        </>
      ),
    [organizations, keywords]
  );

  return (
    <Page>
      <SearchBar defaultValue={keywords} onSearch={onSearch} />
      <PageContent container>
        <Button className="mb-4" variant="text" startIcon={<LineIcon icon="arrow-left" />}>
          All organizations
        </Button>
        <div className="flex flex-col w-full lg:flex-row">
          <section className="w-full lg:w-2/3">
            {title && (
              <h4 className="mb-3 text-lg font-bold animate-fade-in-bck">Your organizations</h4>
            )}
            {isNotNilOrEmpty(error) ? (
              <SearchError className="mt-10 mb-3 lg:mb-10 animate-fade-in-bck" error={error} />
            ) : (
              <OrganizationCardList
                organizations={organizations}
                onOrganizationClick={onOrganizationClick}
              />
            )}
          </section>
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

Search.getLayout = getLayout;

export default Search;
