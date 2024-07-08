import React from 'react';
import { Helmet } from 'react-helmet';
function ProfileForFacbookPage() {

    return ( <>
            <Helmet>
                <meta property="og:title" content="Your Page Title" />
                <meta property="og:description" content="Description of your page" />
                <meta property="og:image" content="URL to your image" />
                <meta property="og:url" content="URL to your web page" />
            </Helmet>

    </> );
}

export default ProfileForFacbookPage;