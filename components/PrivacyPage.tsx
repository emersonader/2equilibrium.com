import React from 'react';
import MarkdownPage from './MarkdownPage';
import privacyContent from '../content/privacy.md?raw';

const PrivacyPage: React.FC = () => <MarkdownPage content={privacyContent} />;

export default PrivacyPage;
