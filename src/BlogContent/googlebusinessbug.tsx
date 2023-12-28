import React from "react";
import { Tag } from "../Blog/Tags.tsx";
import { MyLocalizedStrings } from "../Language/MyLocalizedStrings.js";
import Gist from "super-react-gist";

export const googlebusinessbug = [
    {
        published: new Date("2023-12-28"),
        titleImage: "google-business-bug/bug.apng",
        tags: [Tag.googleBusiness],
        translations: MyLocalizedStrings.create({
            en: {
                title: "How To Remove Attributes from Google Business",
                subtitle: "Currently, you cannot unset attributes for Google Business profiles because the UI is lacking. This is a hacky workaround.",
                content: () => <>
                    <p>
                        While creating a Google Business Profile for someone, I encountered an extremely annoying bug.
                        Google Business allows you to set attributes for a business that describe it and provide more information for potential customers.
                        For example, whether a business
                    </p>
                    <ul>
                        <li>
                            has a bathroom,
                        </li>
                        <li>is child friendly,</li>
                        <li>accessible by wheelchar</li>
                    </ul>
                    <p>
                        etc. All of these attributes are boolean (True or False) values.
                    </p>
                    <p>
                        Initially, none of these values are set in the editor and they do not appear in the publicly visible profile.
                        If an adminstrator sets one of these attributes to True or False, they appear in the profile.
                        So far, no problem.
                    </p>
                    <p>
                        But once an attribute is set to true or false, it cannot be reverted to its original state of being undefined.
                        Currently (last checked on 2023-12-28), the UI does not allow it:
                    </p>
                    <video controls>
                        <source src="./google-business-bug/google-bug.mp4" type="video/mp4" />
                    </video>
                    <p>
                        From now on, the attribute will be publicly visible, regardless of whether it is true or false
                        (although there are some exceptions to this).
                    </p>
                    <p>
                        For example, the attribute "Offers On-Site Services" is not defined at start and not shown in the profile.
                        But once it is set to True or False, it will always be visible to customers via a text field that either says
                        "This business offers on-site services" or "This business does not offer on-site services".

                        This has been critiqued by other users as well. <a href="https://support.google.com/business/thread/198894947/remove-or-clear-an-attribute-from-business-profile?hl=en">One user complains that the profile of their mattress company now states
                            whether they recycle batteries or not.</a>
                    </p>
                    <h1>Finding a solution</h1>
                    <p>
                        Since I've encountered this problem multiple times when setting up profiles for new or existing businesses,
                        I just had to find a solution that did not involve contacting google support everytime I wanted to remove an attribute.
                        My educated guess was that this is a UI limitation and deleting attribute values is not prohibited server-side.
                    </p>
                    <h2>Analysis</h2>
                    <p>
                        First, I used the browser developer tools to monitor the requests sent to google servers.
                        Using Firefox, this is the tab called "Network Analysis".
                        On clicking a "Yes" or "No" button, a <code>POST</code> Request is sent to the server.
                        When setting "Has On-Site Services" to <code>true</code>, he request body looked somewhat like this:
                    </p>
                    <code>
                        "f.req=%5B%5B%5B%22wylbse%22%2C%22%5B%5C%2211975793267720408247%5C%22%2C%5Bnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5Bnull%2Cnull%2Cnull%2Cnull%2C%5C%22offers_online_classes%5C%22%5D%2C%5Bnull%2C%5B%5Bnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C1%5D%5D%2Cnull%2Cnull%2C%5C%22has_onsite_services%5C%22%5D%5D%2Cnull%2C%5B%5Bnull%2Cnull%2Cnull%2Cnull%2C%5C%22languages_spoken%5C%22%5D%5D%5D%2C5%2C%5Bnull%2C%5C%22aaaaaaaaaaaaa%5C%22%2C%5C%22aaaaaa%5C%22%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=ABCDEFG&"
                    </code>
                    <p>
                        This is UTF-8 encoded. A decoded and prettified version of the field <code>f.req</code> would look like this:
                    </p>
                    <Gist url="https://gist.github.com/ejuet/af7ddd1a1fa0f0e52598f98fa0627586" />
                    <p>
                        When I set "Has On-Site Services" to <code>False</code>, the request body looked exactly the same,
                        except one value in the array was <code>0</code> instead of <code>one</code>.
                        I concluded, this was the new value for the attribute <code>has_onsite_services</code>.
                    </p>
                    <h2>Solution</h2>
                    <p>
                        Therefore, I prepared to send a request that was an exact copy of the previous requests,
                        and replaced the one value that was <code>0</code> or <code>1</code> with <code>null</code>.
                    </p>
                    <h3>Using Browser Dev Tools</h3>
                    <p>
                        Firefox has a useful feature for that. On rightclicking on a request in the network analysis tab,
                        it allows you to copy the request as a <code>curl</code>-url, as <code>javaScript</code>-code or <code>powershell</code>.
                        I used powershell and created a request that looked like this:
                    </p>
                    <Gist url="https://gist.github.com/ejuet/31c116ec750b1a88b6d9e33b48521590" />
                    <h1>Hurray!</h1>
                    <p>
                        This actually worked. After the usual time google takes to digest the changes,
                        the attribute was removed from the business and did not show in its public profile anymore.
                    </p>
                </>
            }
        }),
    }
];
