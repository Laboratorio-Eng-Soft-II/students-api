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
        const { nusp,
                name,
                engineering,
                current_quarter,
                usp_email,
                phone,
                skills,
                address } = request.body;
        
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

}