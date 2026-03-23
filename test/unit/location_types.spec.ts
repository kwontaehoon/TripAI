import { location_types, placeTypeMap } from '../../src/util/google_nearby_api/location_types';

describe('location_types', () => {
  describe('매핑된 타입 반환', () => {
    it('park → 공원', () => {
      expect(location_types('park')).toBe('공원');
    });

    it('hotel → 호텔', () => {
      expect(location_types('hotel')).toBe('호텔');
    });

    it('restaurant → 레스토랑', () => {
      expect(location_types('restaurant')).toBe('레스토랑');
    });

    it('museum → 박물관', () => {
      expect(location_types('museum')).toBe('박물관');
    });

    it('airport → 공항', () => {
      expect(location_types('airport')).toBe('공항');
    });

    it('subway_station → 지하철역', () => {
      expect(location_types('subway_station')).toBe('지하철역');
    });

    it('korean_restaurant → 한식당', () => {
      expect(location_types('korean_restaurant')).toBe('한식당');
    });
  });

  describe('알 수 없는 타입', () => {
    it('매핑되지 않은 타입이면 "기타"를 반환한다', () => {
      expect(location_types('unknown_type')).toBe('기타');
    });

    it('빈 문자열이면 "기타"를 반환한다', () => {
      expect(location_types('')).toBe('기타');
    });

    it('대소문자가 다르면 "기타"를 반환한다 (대소문자 구분)', () => {
      expect(location_types('Park')).toBe('기타');
      expect(location_types('HOTEL')).toBe('기타');
    });
  });

  describe('placeTypeMap 데이터 정합성', () => {
    it('placeTypeMap의 모든 값이 비어있지 않은 문자열이다', () => {
      Object.entries(placeTypeMap).forEach(([key, value]) => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it('placeTypeMap의 모든 키가 소문자와 언더스코어로만 구성된다', () => {
      Object.keys(placeTypeMap).forEach((key) => {
        expect(key).toMatch(/^[a-z0-9_]+$/);
      });
    });

    it('location_types 반환값이 placeTypeMap 값과 일치한다', () => {
      const sampleKeys = ['park', 'hotel', 'museum', 'airport', 'beach', 'zoo'];
      sampleKeys.forEach((key) => {
        expect(location_types(key)).toBe(placeTypeMap[key]);
      });
    });
  });
});
