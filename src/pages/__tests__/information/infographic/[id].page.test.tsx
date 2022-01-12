import { infoGraphics } from '@/modules/information/data';
import { Infographic } from '@/modules/information/models/infographic';
import { getStaticPaths, getStaticProps } from '@/pages/information/infographic/[id].page';

describe('Infographic Pages', () => {
  it('should generate a list of infographics for routing', () => {
    const infographicIds = infoGraphics;
    const result = getStaticPaths(null);

    expect(result).toEqual({
      paths: infographicIds.map((x) => ({ params: { id: x.id } })),
      fallback: false,
    });
  });
  it('should render an infographic', () => {
    const result = getStaticProps({ params: { id: 'cave-johnson' } })['props'] as {
      infographic: Infographic;
    };
  });
});
