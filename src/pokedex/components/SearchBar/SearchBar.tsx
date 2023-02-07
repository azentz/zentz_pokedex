import React, { SyntheticEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchText = searchParams.get('search') ?? '';

  const handleSearchSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      search: { value: string };
    };

    if (target.search.value !== '') {
      searchParams.set('search', target.search.value);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(`?${searchParams.toString()}`);
  };

  return (
    <Form onSubmit={handleSearchSubmit}>
      <Row>
        <Col xs="auto" sm={8} md={6}>
          <Form.Control placeholder={t('search_by_name_or_number') as string} name="search" defaultValue={searchText} />
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit">
            {t('search')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;