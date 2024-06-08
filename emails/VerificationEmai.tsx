import * as React from 'react';
import { Html, Button } from "@react-email/components";

export function Email(verifyCode: string) {


    return (
        <Html lang="en">
            <h1>{verifyCode}</h1>
        </Html>
    );
}

export default Email;
