import Button from '@/components/core/button';
import LineIcon from '@/components/core/line-icon';
import Link from '@/components/core/link';
import Page from '@/components/layout/page';
import PropTypes from 'prop-types';
import boolify from 'yn';
import dynamic from 'next/dynamic';
import { getLayout } from '@/components/layout/app-layout';
import { isUnauthorizedOrForbidden } from '@/fetch';
import { useRouter } from 'next/router';

ErrorPage.propTypes = {
  /**
   * Status code shown (defaults to 500).
   * @type {number}
   */
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Optional error technical description. Will be displayed
   * if `NEXT_PUBLIC_AS_DEBUG` environment variable is set to a truthy value.
   * @type {string}
   */
  message: PropTypes.string
};

/**
 * Whether to show technical error information or not.
 * @type {boolean}
 */
const DEBUG = boolify(process.env.NEXT_PUBLIC_AS_DEBUG, { default: false });

/**
 * System administrator email. A `mailto:` link to it will
 * be show in case of error.
 *
 * @constant {string}
 */
const SYSTEM_ADMIN_EMAIL = process.env.NEXT_PUBLIC_AS_SYSTEM_ADMIN_EMAIL;

// We import error icons dynamically because only one is shown at a given time
// so we can save a few kB when loading the error page
const ErrorIcon = dynamic(() => import('../components/icons/error-icon'));
const ForbiddenIcon = dynamic(() => import('../components/icons/forbidden-icon'));

function Http500() {
  return (
    <>
      <div className="text-lg font-light text-center text-gray-900 lg:text-xl">
        This is likely an <b>unexpected error</b> that we are not aware of.
      </div>

      <ErrorIcon className="w-auto max-h-full px-10 mt-10 mb-8 max-w-error-icon" />

      <p className="mt-4 text-sm text-center text-gray-900 lg:text-lg lg:mt-2">
        You could help by{' '}
        <Link href={`mailto:${SYSTEM_ADMIN_EMAIL}`} color="primary">
          contacting the administrator
        </Link>{' '}
        and letting us know about this event.
      </p>
    </>
  );
}

function Http403() {
  return (
    <>
      <div className="text-lg font-light text-center text-gray-900 lg:text-xl">
        Looks like you are <b>not supposed</b> to be here.
      </div>

      <ForbiddenIcon className="w-auto max-h-full px-10 mt-10 mb-8 max-w-error-icon" />

      <p className="mt-4 text-sm text-center text-gray-900 lg:text-lg lg:mt-2">
        We could not <b>grant you access to this page</b>. If you think you should have been able to
        access it, please{' '}
        <Link color="primary" href={`mailto:${SYSTEM_ADMIN_EMAIL}`}>
          contact the administrator
        </Link>{' '}
        and let us know about this.
      </p>
    </>
  );
}

function ErrorPage({ message, statusCode }) {
  const router = useRouter();

  return (
    <Page className="min-h-screen" headTitle="We apologize!">
      <div className="container flex flex-col items-center max-w-screen-lg px-5 py-10 mx-auto">
        <h4 className="text-xl font-bold text-center lg:text-2xl">We apologize!</h4>

        {isUnauthorizedOrForbidden(statusCode) ? <Http403 /> : <Http500 />}

        {DEBUG && message && (
          <code className="mt-12 font-mono">
            [{statusCode}] {message}
          </code>
        )}

        <Button
          startIcon={<LineIcon icon="arrow-left" />}
          className="w-full mt-10 lg:w-auto"
          color="primary"
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </div>
    </Page>
  );
}

ErrorPage.getLayout = getLayout;

export async function getServerSideProps({ err, res }) {
  const statusCode = res?.statusCode ?? err?.status ?? 500;
  const message = err?.message ?? 'Unknown error';

  return {
    props: { statusCode, message }
  };
}

export default ErrorPage;
