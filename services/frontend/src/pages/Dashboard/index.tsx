import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContainer,
  Profile,
  Content,
  Schedule,
  // NexAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

// interface MonthAvailability {
//   day: number;
//   available: boolean;
// }

interface Package {
  id: string;
  name: string;
  created_at: string;
  hourFormatted: string;
  user: {
    name: string;
    // avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [monthAvailability, setMonthAvailability] = useState<
  //   MonthAvailability[]
  // >([]);
  const [packages, setPackages] = useState<Package[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) setSelectedDate(day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // useEffect(() => {
  //   api
  //     .get(`providers/${user.id}/month-availability`, {
  //       params: {
  //         year: currentMonth.getFullYear(),
  //         month: currentMonth.getMonth() + 1,
  //       },
  //     })
  //     .then(({ data }) => setMonthAvailability(data));
  // }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Package[]>('packages/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(({ data }) => {
        const packagesFormatted = data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.created_at), 'HH:mm'),
          };
        });
        console.log(packagesFormatted);
        setPackages(packagesFormatted);
      });
  }, [selectedDate]);

  // const disabledDays = useMemo(() => {
  //   const dates = monthAvailability
  //     .filter(monthDay => monthDay.available === false)
  //     .map(monthDay => {
  //       const year = currentMonth.getFullYear();
  //       const month = currentMonth.getMonth();

  //       return new Date(year, month, monthDay.day);
  //     });

  //   return dates;
  // }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBr,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBr,
    });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return packages.filter(appointment => {
      return parseISO(appointment.created_at).getHours() < 12;
    });
  }, [packages]);

  const afternoonAppointments = useMemo(() => {
    return packages.filter(appointment => {
      return parseISO(appointment.created_at).getHours() >= 12;
    });
  }, [packages]);

  // const nextAppointment = useMemo(() => {
  //   return packages.find(appointment => {
  //     return isAfter(parseISO(appointment.created_at), new Date());
  //   });
  // }, [packages]);

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <img src={logo} alt="SpaceHub" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>

              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContainer>
      </Header>

      <Content>
        <Schedule>
          <h1>Meus pacotes</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {/* {isToday(selectedDate) && nextAppointment && (
            <NexAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NexAppointment>
          )} */}

          <Section>
            <strong>Manh??</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum pacote neste per??odo</p>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  {/* <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  /> */}
                  <strong>{appointment.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum pacote neste per??odo</p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  {/* <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  /> */}
                  <strong>{appointment.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            // disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Mar??o',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
