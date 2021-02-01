import Button from '@/components/core/button';
import NotFoundIcon from '@/components/icons/not-found-icon';
import Page from '@/components/layout/page';
import { getLayout } from '@/components/layout/app-layout';
import { useRouter } from 'next/router';

function Error404Page() {
  const router = useRouter();

  return (
    <Page className="pt-2" headTitle="Not found">
      <div className="container flex flex-col items-center max-w-screen-lg px-5 pt-10 pb-12 mx-auto">
        <h4 className="text-xl font-bold text-center lg:text-2xl">
          The page you are looking for isn&#39;t here
        </h4>
        <div className="text-lg font-light text-center text-gray-900 lg:text-xl">
          But you can always <b>start again</b> from the beginning.
        </div>
        <NotFoundIcon className="h-auto max-w-full px-6 mt-12 mb-8 max-h-404-icon" />
        <Button className="w-full mt-10 lg:w-auto" color="primary" onClick={() => router.push('/')}>
          Back to home
        </Button>
      </div>
    </Page>
  );
}

Error404Page.getLayout = getLayout;

export default Error404Page;
