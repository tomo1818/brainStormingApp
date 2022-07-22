/* eslint-disable object-curly-newline */
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import { Link as LinkButton } from 'react-router-dom';
import { app } from '../libs/Firebase';
import { AuthContext } from '../context/AuthContext';

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Room',
    href: '/room',
  },
];

function MobileNavItem({ label, href }: NavItem) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
      </Flex>

      <Collapse
        in={isOpen}
        animateOpacity
        style={{
          marginTop: '0!important',
        }}
      >
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        />
      </Collapse>
    </Stack>
  );
}

function MobileNav() {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{
        md: 'none',
      }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
}

function DesktopNav() {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Link
                as={LinkButton}
                to={navItem.href}
                p={2}
                fontSize="sm"
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
}

function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth(app);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{
          base: 2,
        }}
        px={{
          base: 4,
        }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align="center"
      >
        <Flex
          flex={{
            base: 1,
            md: 'auto',
          }}
          ml={{
            base: -2,
          }}
          display={{
            base: 'flex',
            md: 'none',
          }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex
          flex={{
            base: 1,
          }}
          justify={{
            base: 'center',
            md: 'start',
          }}
        >
          <Text
            textAlign={useBreakpointValue({
              base: 'center',
              md: 'left',
            })}
            fontFamily="heading"
            color={useColorModeValue('green.400', 'white')}
          >
            Mind Map
          </Text>

          <Flex
            display={{
              base: 'none',
              md: 'flex',
            }}
            ml={10}
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{
            base: 1,
            md: 0,
          }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          {currentUser ? (
            <Button
              fontSize="sm"
              fontWeight={400}
              variant="link"
              onClick={handleSignOut}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button fontSize="sm" fontWeight={400} variant="link">
                <LinkButton to="login">Login</LinkButton>
              </Button>
              <Button fontSize="sm" fontWeight={400} variant="link">
                <LinkButton to="signup">Sign Up</LinkButton>
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

export default Header;
