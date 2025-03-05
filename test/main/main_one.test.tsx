import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import One from '@/app/main/one'

test('main_one 간단한 테스트 작성', () => {
    render(<One />)

    expect(screen.getByRole('taehoon')).toBeInTheDocument();
})