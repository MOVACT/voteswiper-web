import Button from 'components/button';
import Container from 'components/layout/container';
import { NextPage } from 'next';
import React from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import styles from './form.module.scss';

const questions = [
  {
    id: 23,
    question:
      'Soll ein bedingungsloses Grundeinkommen als Ersatz für andere Sozialleistungen eingeführt werden?',
  },
  {
    id: 24,
    question: 'Sollte Edward Snowden politisches Asyl gewährt werden?',
  },
  {
    id: 25,
    question: 'Sollte es eine gemeinsame Armee der EU-Staaten geben?',
  },
  {
    id: 26,
    question:
      'Soll es möglich sein, neben der deutschen staatsbürgerschaft eine weitere zu besitzen?',
  },
];

const Form: NextPage = () => {
  const [answers, setAnswers] = React.useState([
    {
      question_id: 23,
      answer: 1,
      reason: 'Lorem ipsum',
    },
    {
      question_id: 24,
      answer: null,
      reason: null,
    },
    {
      question_id: 25,
      answer: null,
      reason: 'Lorem ipsum',
    },
    {
      question_id: 26,
      answer: 2,
    },
  ]);
  const [expanded, setExpanded] = React.useState<false | number>(false);

  const answeredQuestions = answers.filter((a) => a.answer !== null).length;
  const reasonedQuestions = answers.filter(
    (a) => a.reason !== '' && a.reason !== null
  ).length;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <Container>
          <h1>Fragebogen zur Bundestagswahl 2021</h1>

          <div className={styles.row}>
            <div className={styles.sidebar}>
              <div className={styles.sidebarBox}>
                <div className={styles.sidebarInfo}>
                  <div className={styles.sidebarTitle}>Frist</div>
                  21. August 2021
                </div>

                <div className={styles.sidebarInfo}>
                  <div className={styles.sidebarTitle}>Partei</div>
                  CDU
                </div>

                <div className={styles.sidebarInfo}>
                  <div className={styles.sidebarTitle}>Fortschritt</div>
                  {answeredQuestions}/{answers.length} Fragen beantwortet
                  <br />
                  {reasonedQuestions}/{answers.length} Antworten begründet
                </div>
              </div>

              <Button color="outlineDark" className={styles.sidebarButton}>
                Fragebogen Ausdrucken
              </Button>
            </div>
            <div className={styles.content}>
              <div className={styles.questions}>
                {questions.map((question, index) => {
                  const answer =
                    answers[
                      answers.findIndex((a) => a.question_id === question.id)
                    ];

                  return (
                    <>
                      <motion.button
                        className={styles.question}
                        key={question.id}
                        initial={false}
                        animate={{
                          backgroundColor:
                            expanded === index
                              ? 'rgb(89, 86, 139, 0.1)'
                              : '#fff',
                        }}
                        onClick={() => {
                          setExpanded(expanded === index ? false : index);
                        }}
                      >
                        <div className={styles.number}>
                          {index + 1}
                          <span>/</span>
                          {questions.length}
                        </div>
                        <div className={styles.text}>{question.question}</div>
                        <div className={styles.status}></div>
                        <div className={styles.icon}>
                          <svg
                            viewBox="0 0 100 100"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M74.88 62.24L40.06 96.76a11.23 11.23 0 01-16.9-1.27 11.32 11.32 0 011.42-14.7l31.04-30.78-31.34-31.13a11.06 11.06 0 011.3-16.82 11.5 11.5 0 0114.8 1.4l34.5 34.25a17.26 17.26 0 010 24.53z"
                              fill="currentColor"
                              fillRule="nonzero"
                            />
                          </svg>
                        </div>
                      </motion.button>
                      <motion.section
                        key="content"
                        initial={{
                          height: '0',
                        }}
                        animate={{
                          height: expanded === index ? 'auto' : '0',
                        }}
                        className={styles.answer}
                        transition={{
                          duration: 0.8,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                      >
                        <div className={styles.answerInner}>
                          <div className={styles.answerTitle}>Ihre Antwort</div>

                          <div
                            className={cn(
                              styles.selection,
                              answer.answer === null && styles.notChecked
                            )}
                          >
                            <button
                              className={cn(
                                styles.selectionButton,
                                styles.yes,
                                answer.answer === 1 && styles.checked
                              )}
                            >
                              Ja
                            </button>
                            <button
                              className={cn(
                                styles.selectionButton,
                                styles.none,
                                answer.answer === 0 && styles.checked
                              )}
                            >
                              Nicht beantworten
                            </button>
                            <button
                              className={cn(
                                styles.selectionButton,
                                styles.no,
                                answer.answer === 2 && styles.checked
                              )}
                            >
                              Nein
                            </button>
                          </div>

                          <div className={styles.answerTitle}>
                            Ihre Begründung
                          </div>

                          <textarea
                            value={answer.reason === null ? '' : answer.reason}
                            rows={4}
                          />
                        </div>
                      </motion.section>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Form;
