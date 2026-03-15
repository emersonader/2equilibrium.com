import React from 'react';
import MarkdownPage from './MarkdownPage';
import termsContent from '../content/terms.md?raw';

const TermsPage: React.FC = () => <MarkdownPage content={termsContent} />;

export default TermsPage;
