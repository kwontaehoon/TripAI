import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '@/app/login/page'

describe('login component 간단한 테스트 작성', () => {
    
    test('document 테스트', () => {
        render(<Login />)

        expect(screen.getByRole('first-div')).toBeInTheDocument();
        expect(screen.getByRole('form')).toBeInTheDocument();
        expect(screen.getByRole('first-label')).toBeInTheDocument();
    })

    test('form label 태그 테스트', () => {
        const { container } = render(<Login />)

        expect(container.querySelector('#email-label div')?.textContent)
        .toMatchInlineSnapshot('"이메일"')
        expect(container.querySelector('#password-label div')?.textContent)
        .toMatchInlineSnapshot('"비밀번호"')
    })

    test('로그인 버튼을 눌렀을 때 login state가 error 메시지 표시', () => {
        render(<Login />)

        fireEvent.click(screen.getByRole('button'))

        expect(screen.getByText('다시 입력해 주세요.')).toBeInTheDocument()
    })
    
})
