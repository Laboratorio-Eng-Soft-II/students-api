import { AppDataSource } from '../utils/data-source'
import { NextFunction, Request, Response } from "express"
import { Student } from "../entities/Student"
import axios from 'axios'
import config from 'config'

export class StudentController {

    private studentRepository = AppDataSource.getRepository(Student)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.studentRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const nusp = request.params.nusp
        const student = await this.studentRepository.findOne({
            where: { nusp }
        })

        if (!student) {
            return "Student not found!"
        }
        return student
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const authUrl = config.get<string>('authUrl');
        const { nusp,
                name,
                engineering,
                current_quarter,
                usp_email,
                phone,
                skills,
                address,
                password } = request.body;
        
        let studentToAdd = await this.studentRepository.findOneBy({ nusp })
        if (studentToAdd) {
            return "Student already registered!"
        }

        const student = Object.assign(new Student(), {
            nusp,
            name,
            engineering,
            current_quarter,
            usp_email,
            phone,
            skills,
            address
        })

        const axiosResponse = await axios.post(authUrl + '/add', {
            email: usp_email,
            password,
            category: "student",
            nusp_cnpj: nusp
        })

        return this.studentRepository.save(student)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const nusp = request.params.nusp
        let studentToRemove = await this.studentRepository.findOneBy({ nusp })

        if (!studentToRemove) {
            return "This student is not registered!"
        }

        await this.studentRepository.remove(studentToRemove)

        return "Student has been removed!"
    }

    async postFeedbackReport(request: Request, response: Response, next: NextFunction){
        const feedbackUrl = config.get<string>('feedbackUrl');
        const { nusp } = request.params
        
        const {
            author,
            author_nusp_cnpj,
            target_nusp_cnpj,
            answers,
            comments
        } = request.body

        let company = await this.studentRepository.findOneBy({ nusp })

        if (!company) {
            return "This student is not registered!"
        }

        const axiosResponse = await axios.post(feedbackUrl + '/feedback', {
            author,
            target: 'company',
            author_nusp_cnpj,
            target_nusp_cnpj,
            answers,
            comments
        })

        return {
            status: axiosResponse.status,
            id: axiosResponse.data.id,
            author_nusp_cnpj,
            target_nusp_cnpj,
            author
        }
    }

    async enrollInPosition(request: Request, response: Response, next: NextFunction){
        const positionsUrl = config.get<string>('positionsUrl');
        const positionId = request.params.positionId

        const { student_nusp,
                cv_link,
                linkedin_link } = request.body

        const axiosResponse = await axios.post(positionsUrl + '/enrollment/' + positionId, {
            student_nusp,
            cv_link,
            linkedin_link
        })

        return {
            status: axiosResponse.status,
            id: axiosResponse.data.id
        }
    }

}